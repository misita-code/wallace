# models/task.py
from sqlalchemy import Column, Integer, String, Text, ForeignKey
from sqlalchemy.orm import relationship
from database import Base, SessionLocal

class Task(Base):
    __tablename__ = 'tasks'
    
    id = Column(Integer, primary_key=True)
    title = Column(String(100), nullable=False)
    description = Column(Text)
    status = Column(String(20), default="pending")  # e.g., pending, completed
    
    # Foreign keys to User and Category
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    category_id = Column(Integer, ForeignKey('categories.id'), nullable=True)
    
    # Relationships (using string names to avoid circular imports)
    user = relationship("User", back_populates="tasks")
    category = relationship("Category", back_populates="tasks")
    
    def __repr__(self):
        return f"<Task(id={self.id}, title='{self.title}', status='{self.status}')>"
    
    # ORM Methods
    @classmethod
    def create(cls, title, description, user_id, category_id=None):
        session = SessionLocal()
        task = cls(title=title, description=description, user_id=user_id, category_id=category_id)
        session.add(task)
        session.commit()
        session.refresh(task)
        session.close()
        return task
        
    @classmethod
    def delete(cls, task_id):
        session = SessionLocal()
        task = session.query(cls).filter_by(id=task_id).first()
        if task:
            session.delete(task)
            session.commit()
        session.close()
        return task
        
    @classmethod
    def get_all(cls):
        session = SessionLocal()
        tasks = session.query(cls).all()
        session.close()
        return tasks
        
    @classmethod
    def find_by_id(cls, task_id):
        session = SessionLocal()
        task = session.query(cls).filter_by(id=task_id).first()
        session.close()
        return task
