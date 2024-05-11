CREATE TABLE dbo.Items (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Code INT NOT NULL,               
    Value VARCHAR(255) NOT NULL    
);

CREATE INDEX idx_code_value ON dbo.Items (Code, Value);
