# cli/main.py
import sys
from models.user import User
from models.task import Task
from models.category import Category
from database import engine, Base

def initialize_database():
    """Creates all tables if they don't exist."""
    Base.metadata.create_all(engine)

def main_menu():
    while True:
        print("\n=== TO-DO CLI Application ===")
        print("1. Manage Users")
        print("2. Manage Categories")
        print("3. Manage Tasks")
        print("4. Exit")
        choice = input("Enter your choice: ")
        if choice == '1':
            manage_users()
        elif choice == '2':
            manage_categories()
        elif choice == '3':
            manage_tasks()
        elif choice == '4':
            print("Exiting the application. Goodbye!")
            sys.exit(0)
        else:
            print("Invalid choice. Please try again.")

def manage_users():
    while True:
        print("\n--- Manage Users ---")
        print("1. Create User")
        print("2. Delete User")
        print("3. List All Users")
        print("4. Find User by ID")
        print("5. Back to Main Menu")
        choice = input("Enter your choice: ")
        if choice == '1':
            username = input("Enter username: ")
            try:
                user_obj = User.create(username=username)
                print("User created:", user_obj)
            except Exception as e:
                print("Error creating user:", e)
        elif choice == '2':
            user_id = input("Enter user ID to delete: ")
            if user_id.isdigit():
                result = User.delete(int(user_id))
                if result:
                    print("User deleted.")
                else:
                    print("User not found.")
            else:
                print("Invalid ID.")
        elif choice == '3':
            users = User.get_all()
            print("All Users:")
            for u in users:
                print(u)
        elif choice == '4':
            user_id = input("Enter user ID to find: ")
            if user_id.isdigit():
                u = User.find_by_id(int(user_id))
                if u:
                    print(u)
                else:
                    print("User not found.")
            else:
                print("Invalid ID.")
        elif choice == '5':
            break
        else:
            print("Invalid choice. Please try again.")

def manage_categories():
    while True:
        print("\n--- Manage Categories ---")
        print("1. Create Category")
        print("2. Delete Category")
        print("3. List All Categories")
        print("4. Find Category by ID")
        print("5. Back to Main Menu")
        choice = input("Enter your choice: ")
        if choice == '1':
            name = input("Enter category name: ")
            try:
                cat = Category.create(name=name)
                print("Category created:", cat)
            except Exception as e:
                print("Error creating category:", e)
        elif choice == '2':
            cat_id = input("Enter category ID to delete: ")
            if cat_id.isdigit():
                result = Category.delete(int(cat_id))
                if result:
                    print("Category deleted.")
                else:
                    print("Category not found.")
            else:
                print("Invalid ID.")
        elif choice == '3':
            cats = Category.get_all()
            print("All Categories:")
            for c in cats:
                print(c)
        elif choice == '4':
            cat_id = input("Enter category ID to find: ")
            if cat_id.isdigit():
                c = Category.find_by_id(int(cat_id))
                if c:
                    print(c)
                else:
                    print("Category not found.")
            else:
                print("Invalid ID.")
        elif choice == '5':
            break
        else:
            print("Invalid choice. Please try again.")

def manage_tasks():
    while True:
        print("\n--- Manage Tasks ---")
        print("1. Create Task")
        print("2. Delete Task")
        print("3. List All Tasks")
        print("4. Find Task by ID")
        print("5. View Tasks for a User")
        print("6. Back to Main Menu")
        choice = input("Enter your choice: ")
        if choice == '1':
            title = input("Enter task title: ")
            description = input("Enter task description: ")
            user_id = input("Enter user ID for this task: ")
            cat_input = input("Enter category ID (or leave blank): ")
            category_id = int(cat_input) if cat_input.isdigit() else None
            if user_id.isdigit():
                try:
                    t = Task.create(title=title, description=description, user_id=int(user_id), category_id=category_id)
                    print("Task created:", t)
                except Exception as e:
                    print("Error creating task:", e)
            else:
                print("Invalid user ID.")
        elif choice == '2':
            task_id = input("Enter task ID to delete: ")
            if task_id.isdigit():
                result = Task.delete(int(task_id))
                if result:
                    print("Task deleted.")
                else:
                    print("Task not found.")
            else:
                print("Invalid ID.")
        elif choice == '3':
            tasks = Task.get_all()
            print("All Tasks:")
            for t in tasks:
                print(t)
        elif choice == '4':
            task_id = input("Enter task ID to find: ")
            if task_id.isdigit():
                t = Task.find_by_id(int(task_id))
                if t:
                    print(t)
                else:
                    print("Task not found.")
            else:
                print("Invalid ID.")
        elif choice == '5':
            user_id = input("Enter user ID to view tasks: ")
            if user_id.isdigit():
                user_obj = User.find_by_id(int(user_id))
                if user_obj:
                    print(f"Tasks for {user_obj.username}:")
                    for t in user_obj.tasks:
                        print(t)
                else:
                    print("User not found.")
            else:
                print("Invalid user ID.")
        elif choice == '6':
            break
        else:
            print("Invalid choice. Please try again.")

if __name__ == "__main__":
    initialize_database()
    main_menu()
