from .entities.entity import Session, engine, Base
from .entities.employee import BaseEmployee, Employee, Management
import datetime

# generate database schema
Base.metadata.create_all(engine)

# start session
session = Session()

# check for existing data
employees = session.query(BaseEmployee).all()

if len(employees) == 0:
    # create and persist dummy employees
    now = datetime.datetime.now()
    lunch = str(now.hour) + ":" + str(now.minute)
    employee = Employee("company 1", "Sample", 80000, "employee", lunch, 2)
    employee2 = Management("company 1", "ManagementSample", 80000, "management", 4)

    session.add(employee)
    session.add(employee2)
    session.commit()
    session.close()

    # reload companies
    employees = session.query(BaseEmployee).all()

# show existing exams
print("### Employees:")
for employee in employees:
    print(f'{employee.id} {employee.name} {employee.salary} {employee.type} {employee.company}')
