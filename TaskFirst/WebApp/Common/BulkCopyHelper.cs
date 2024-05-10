using System.Data;
using System.Linq.Expressions;
using System.Reflection;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using WebApp.Data;

namespace WebApp.Common;

public static class BulkCopyHelper
{
    private static DataTable NewTable<T>(params string[] orderedPropertyList)
    {
        var table = new DataTable();

        var properties = typeof(T).GetProperties(BindingFlags.Instance | BindingFlags.Public | BindingFlags.GetProperty);
        var propertyInfos = orderedPropertyList.Select(x => properties.SingleOrDefault(p => p.Name == x));
        foreach (var property in propertyInfos)
        {
            var columnType = property.PropertyType;
            var column = new DataColumn(property.Name);

            if (columnType.IsGenericType && columnType.GetGenericTypeDefinition() == typeof(Nullable<>))
            {
                column.DataType = Nullable.GetUnderlyingType(columnType);
            }
            else if (columnType.IsEnum)
            {
                column.DataType = Enum.GetUnderlyingType(columnType);
            }
            else
            {
                column.DataType = columnType;
            }

            table.Columns.Add(column);
        }

        return table;
    }

    public static async Task BulkCopyListAsync<T>(
        this AppDbContext appDbContext,
        string tableName,
        IEnumerable<T> listToInsert,
        params Expression<Func<T, object>>[] properties)
    {
        var stringProps = properties
            .Select(x => x.Body is UnaryExpression expression ? ((MemberExpression) expression.Operand) : ((MemberExpression) x.Body))
            .Select(x => x.Member.Name)
            .ToList();

        var functions = properties.Select(x => x.Compile()).ToList();
        var mappings = stringProps.Select(x => new SqlBulkCopyColumnMapping(x, x)).ToList();
        var table = NewTable<T>(stringProps.ToArray());
        var convertedObjectsList = listToInsert
            .Select(x => Tuple.Create(x, table.NewRow()))
            .Select(x =>
            {
                for (var i = 0; i < functions.Count; i++) x.Item2[i] = functions[i](x.Item1);
                return x.Item2;
            })
            .ToArray();

        var typeName = tableName;
        var connectionString = appDbContext.Database.GetConnectionString();
        using var cnn = new SqlConnection(connectionString);
        await cnn.OpenAsync().ConfigureAwait(false);
        using (var sqlBulkCopy = new SqlBulkCopy(cnn))
        {
            sqlBulkCopy.DestinationTableName = typeName;

            foreach (var mapping in mappings)
            {
                sqlBulkCopy.ColumnMappings.Add(mapping);
            }

            await sqlBulkCopy.WriteToServerAsync(convertedObjectsList);
        }
    }
}