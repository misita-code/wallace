# database.py
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, scoped_session

# Create an SQLite database named "todo.db"
engine = create_engine("sqlite:///todo.db", echo=False)

# Use scoped_session to handle sessions in a thread-safe way.
SessionLocal = scoped_session(sessionmaker(bind=engine))

# Base class for our models
Base = declarative_base()
