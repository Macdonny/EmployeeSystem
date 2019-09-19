from flask_cors import CORS
from flask import Flask, jsonify, request
from sqlalchemy import func
from .entities.entity import Session, engine, Base
from .entities.employee import BaseEmployee, Employee, Management, BaseEmployeeSchema, EmployeeSchema, ManagementSchema
import datetime

app = Flask(__name__)
CORS(app)

Base.metadata.create_all(engine)


@app.route('/getAllEmployees')
def get_all_employees():
    # fetching from the database
    session = Session()
    employee_objects = session.query(Employee).all()
    management_object = session.query(Management).all()

    # transforming into JSON-serializable objects
    employee_schema = EmployeeSchema(many=True)
    management_schema = ManagementSchema(many=True)

    employees = employee_schema.dump(employee_objects)
    management = management_schema.dump(management_object)
    all_employees = employees + management
    sorted_all_employees = sorted(all_employees, key=lambda employee: employee["name"])

    # serializing as JSON
    session.close()
    return jsonify(sorted_all_employees)


@app.route('/addEmployee',  methods=['POST'])
def add_employee():

    request_obj = request.get_json()
    if request_obj["type"].lower() == "employee":
        posted_employee = EmployeeSchema(only=('company', 'name', 'salary', 'type', 'lunchtime', 'years_of_experience')).load(request_obj)
        employee = Employee(**posted_employee)

        # persist employee
        session = Session()
        session.add(employee)
        session.commit()

        # return created employee
        new_employee = EmployeeSchema().dump(employee)
        session.close()
        return jsonify(new_employee), 201
    elif request_obj["type"].lower() == "management":
        posted_employee = ManagementSchema(only=('company', 'name', 'salary', 'type', 'reception_hours')).load(request_obj)
        employee = Management(**posted_employee)

        # persist employee
        session = Session()
        session.add(employee)
        session.commit()

        # return created employee
        new_employee = ManagementSchema().dump(employee)
        session.close()
        return jsonify(new_employee), 201


@app.route('/editEmployee',  methods=['PUT'])
def edit_employee():

    request_obj = request.get_json()
    if request_obj["type"].lower() == "employee":
        employee = EmployeeSchema(only=('id', 'company', 'name', 'salary', 'type', 'lunchtime', 'years_of_experience')).load(request_obj)
        # persist employee
        session = Session()
        session.query(Employee).filter(Employee.id == employee["id"]).update(employee)
        session.commit()

        # return created employee
        new_employee = EmployeeSchema().dump(employee)
        session.close()
        return jsonify(new_employee), 200
    elif request_obj["type"].lower() == "management":
        employee = ManagementSchema(only=('id', 'company', 'name', 'salary', 'type', 'reception_hours')).load(request_obj)

        # persist employee
        session = Session()
        session.query(Management).filter(Management.id == employee["id"]).update(employee)
        session.commit()

        # return created employee
        new_employee = ManagementSchema().dump(employee)
        session.close()
        return jsonify(new_employee), 200


@app.route('/getHighestSalaries', methods=['GET'])
def get_highest_salaries():
    session = Session()

    # Group employee data by company name and take average of their salaries
    company_groupby = session.query(func.avg(BaseEmployee.salary).label('average_salary'), BaseEmployee.company.label("company")).group_by(BaseEmployee.company).all()

    # Unpack list of tuples to be processed into JSON
    company_avg_salaries = [{"average_salary":salary, "company":company} for salary,company in company_groupby]

    # Sort companies by average salaries and returning the top 3
    sorted_company_avg_salaries = sorted(company_avg_salaries, key=lambda company: company["average_salary"], reverse=True)[:3]

    session.close()
    return jsonify(sorted_company_avg_salaries)
