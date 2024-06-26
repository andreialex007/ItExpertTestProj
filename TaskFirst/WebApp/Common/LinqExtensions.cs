﻿using System.Linq.Expressions;
using System.Reflection;

#pragma warning disable CS1591 // Missing XML comment for publicly visible type or member

namespace WebApp.Common;

public static class LinqExtensions
{
    public static List<object> Map<TSource>(this IEnumerable<TSource> source, Expression<Func<TSource, object>> selector)
    {
        return source.AsQueryable().Select(selector).ToList();
    }

    public static TResult SelectSingle<TSource, TResult>(this IQueryable<TSource> source, Expression<Func<TSource, TResult>> selector)
    {
        return source.Select(selector).SingleOrDefault();
    }

    public static IOrderedQueryable<TSource> OrderBy<TSource, TKey>(this IQueryable<TSource> source, Expression<Func<TSource, TKey>> keySelector, bool isAsc = true)
    {
        return isAsc ? Queryable.OrderBy(source, keySelector) : source.OrderByDescending(keySelector);
    }

    public static List<TSource> TakePage<TSource>(this IQueryable<TSource> source, int skip, int take) where TSource : class
    {
        return source.Skip(skip).Take(take).ToList();
    }

    public static IOrderedQueryable<T> OrderBy<T>(this IQueryable<T> source, string property, bool isAsc)
    {
        return !isAsc ? source.OrderBy(property) : source.OrderByDescending(property);
    }

    public static IOrderedQueryable<T> OrderBy<T>(this IQueryable<T> source, string property)
    {
        return ApplyOrder(source, property, "OrderBy");
    }

    public static IOrderedQueryable<T> OrderByDescending<T>(this IQueryable<T> source, string property)
    {
        return ApplyOrder(source, property, "OrderByDescending");
    }

    public static IOrderedQueryable<T> ThenBy<T>(this IOrderedQueryable<T> source, string property)
    {
        return ApplyOrder(source, property, "ThenBy");
    }

    public static IOrderedQueryable<T> ThenByDescending<T>(this IOrderedQueryable<T> source, string property)
    {
        return ApplyOrder(source, property, "ThenByDescending");
    }

    static IOrderedQueryable<T> ApplyOrder<T>(IQueryable<T> source, string property, string methodName)
    {
        string[] props = property.Split('.');
        Type type = typeof(T);
        ParameterExpression arg = Expression.Parameter(type, "x");
        Expression expr = arg;
        foreach (string prop in props)
        {
            PropertyInfo pi = type.GetProperty(prop);
            expr = Expression.Property(expr, pi);
            type = pi.PropertyType;
        }

        Type delegateType = typeof(Func<,>).MakeGenericType(typeof(T), type);
        LambdaExpression lambda = Expression.Lambda(delegateType, expr, arg);

        object result = typeof(Queryable).GetMethods().Single(
                method => method.Name == methodName
                          && method.IsGenericMethodDefinition
                          && method.GetGenericArguments().Length == 2
                          && method.GetParameters().Length == 2)
            .MakeGenericMethod(typeof(T), type)
            .Invoke(null, new object[] {source, lambda});
        return (IOrderedQueryable<T>) result;
    }

    private static readonly Random Rng = new Random();
}