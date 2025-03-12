# models/category.py
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from database import Base, SessionLocal

class Category(Base):
    __tablename__ = 'categories'
    
    id = Column(Integer, primary_key=True)
    name = Column(String(50), unique=True, nullable=False)
    
    # One-to-many relationship: One category can have many tasks.
    tasks = relationship("Task", back_populates="category", cascade="all, delete")
    
    def __repr__(self):
        return f"<Category(id={self.id}, name='{self.name}')>"
    
    # ORM Methods
    @classmethod
    def create(cls, name):
        session = SessionLocal()
        category = cls(name=name)
        session.add(category)
        session.commit()
        session.refresh(category)
        session.close()
        return category
        
    @classmethod
    def delete(cls, category_id):
        session = SessionLocal()
        category = session.query(cls).filter_by(id=category_id).first()
        if category:
            session.delete(category)
            session.commit()
        session.close()
        return category
        
    @classmethod
    def get_all(cls):
        session = SessionLocal()
        categories = session.query(cls).all()
        session.close()
        return categories
        
    @classmethod
    def find_by_id(cls, category_id):
        session = SessionLocal()
        category = session.query(cls).filter_by(id=category_id).first()
        session.close()
        return category
