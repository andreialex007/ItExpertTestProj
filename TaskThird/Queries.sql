With FirstSequence
     as (SELECT *
         FROM   [dbo].[Dates]),
     SecondSequence
     as (SELECT *
         FROM   [dbo].[Dates]),
     Joined
     as (select fs.Id,
                fs.Dt as start,
                sc.Dt as [end]
         from   FirstSequence fs,
                SecondSequence sc
         where  fs.Id = sc.Id
                and sc.Dt > fs.Dt),
     Groupped
     as (select j.Id,
                j.start,
                Min(j.[end]) as [end]
         from   Joined j
         group  by j.Id,
                   j.start)
select *
from   Groupped 