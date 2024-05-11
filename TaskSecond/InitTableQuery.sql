-- Creating the Clients table
CREATE TABLE Clients (
    Id bigint PRIMARY KEY,
    ClientName nvarchar(200)
);

-- Creating the ClientContacts table
CREATE TABLE ClientContacts (
    Id bigint PRIMARY KEY,
    ClientId bigint,
    ContactType nvarchar(255),
    ContactValue nvarchar(255),
    FOREIGN KEY (ClientId) REFERENCES Clients(Id)
);

-- Inserting more sample data into Clients
INSERT INTO Clients (Id, ClientName)
VALUES (4, N'ООО Солнце'),
       (5, N'ООО Луна'),
       (6, N'ИП Петров П.П.'),
       (7, N'ЗАО Ветер'),
       (8, N'ИП Сидоров С.С.'),
       (9, N'ООО Звезда');

-- Inserting more sample data into ClientContacts
INSERT INTO ClientContacts (Id, ClientId, ContactType, ContactValue)
VALUES (5, 4, N'Email', N'sun@example.com'),
       (6, 4, N'Telephone', N'+7-499-765-4321'),
       (7, 5, N'Email', N'moon@example.com'),
       (8, 5, N'Telephone', N'+7-491-876-5432'),
       (9, 6, N'Email', N'petrov@example.ru'),
       (10, 6, N'Telephone', N'+7-499-123-9876'),
       (11, 7, N'Email', N'veter@zaocom.ru'),
       (12, 7, N'Telephone', N'+7-495-654-3210'),
       (13, 8, N'Email', N'sidorov@ip.ru'),
       (14, 8, N'Telephone', N'+7-499-321-6543'),
       (15, 9, N'Email', N'star@ooo.com'),
       (16, 9, N'Telephone', N'+7-495-987-6543');
