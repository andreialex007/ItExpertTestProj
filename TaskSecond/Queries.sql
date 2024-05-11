-- FIRST QUERY
select cl.ClientName, count(cl.ClientName) as NumContacts
from dbo.Clients cl
inner join dbo.ClientContacts cnt on cnt.ClientId = cl.Id
group by cl.ClientName


-- SECOND QUERY
select cl.ClientName, count(cl.ClientName) as NumContacts
from dbo.Clients cl
inner join dbo.ClientContacts cnt on cnt.ClientId = cl.Id
group by cl.ClientName 
having count(cl.ClientName) >= 2