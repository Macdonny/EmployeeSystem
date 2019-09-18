from flask import Flask, jsonify, request
from .entities.entity import Session, engine, Base
from .entities.employee import BaseEmployee, Employee, Management, BaseEmployeeSchema, EmployeeSchema, ManagementSchema
import datetime

app = Flask(__name__)

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

    # serializing as JSON
    session.close()
    return jsonify(all_employees)
