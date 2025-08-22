PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS Buyers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  contact TEXT
);

CREATE TABLE IF NOT EXISTS Items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  base_price REAL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS BuyerRates (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  buyer_id INTEGER NOT NULL,
  item_id INTEGER NOT NULL,
  rate REAL NOT NULL,
  UNIQUE (buyer_id, item_id),
  FOREIGN KEY (buyer_id) REFERENCES Buyers(id) ON DELETE CASCADE,
  FOREIGN KEY (item_id) REFERENCES Items(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Bills (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  buyer_id INTEGER NOT NULL,
  date TEXT NOT NULL,
  total REAL NOT NULL,
  FOREIGN KEY (buyer_id) REFERENCES Buyers(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS BillItems (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  bill_id INTEGER NOT NULL,
  item_id INTEGER NOT NULL,
  qty INTEGER NOT NULL,
  rate REAL NOT NULL,      -- snapshot of rate at billing time
  subtotal REAL NOT NULL,  -- qty * rate
  FOREIGN KEY (bill_id) REFERENCES Bills(id) ON DELETE CASCADE,
  FOREIGN KEY (item_id) REFERENCES Items(id) ON DELETE SET NULL
);

-- Helpful indexes
CREATE INDEX IF NOT EXISTS idx_buyer_rates_buyer_item ON BuyerRates(buyer_id, item_id);
CREATE INDEX IF NOT EXISTS idx_billitems_bill ON BillItems(bill_id);
