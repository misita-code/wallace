# models/user.py
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from database import Base, SessionLocal

class User(Base):
    __tablename__ = 'users'
    
    id = Column(Integer, primary_key=True)
    username = Column(String(50), unique=True, nullable=False)
    
    # One-to-many relationship: One user can have many tasks.
    tasks = relationship("Task", back_populates="user", cascade="all, delete")

    def __repr__(self):
        return f"<User(id={self.id}, username='{self.username}')>"
    
    # ORM Methods
    @classmethod
    def create(cls, username):
        session = SessionLocal()
        user = cls(username=username)
        session.add(user)
        session.commit()
        session.refresh(user)
        session.close()
        return user
        
    @classmethod
    def delete(cls, user_id):
        session = SessionLocal()
        user = session.query(cls).filter_by(id=user_id).first()
        if user:
            session.delete(user)
            session.commit()
        session.close()
        return user
        
    @classmethod
    def get_all(cls):
        session = SessionLocal()
        users = session.query(cls).all()
        session.close()
        return users
        
    @classmethod
    def find_by_id(cls, user_id):
        session = SessionLocal()
        user = session.query(cls).filter_by(id=user_id).first()
        session.close()
        return user
