from sqlalchemy import Column, Float, ForeignKey, Integer, String

from sqlalchemy.orm import relationship

from .entity import Base


class BaseEmployee(Base):
    __tablename__ = 'employees'
    id = Column(Integer, primary_key=True)
    company = Column(String(50))
    name = Column(String(50))
    salary = Column(Float(asdecimal=True))
    type = Column(String(50))

    __mapper_args__ = {
        'polymorphic_on':type,
        'polymorphic_identity':'base_employee'
    }

    def __init__(self, company, name, salary, type):
        self.company = company
        self.name = name
        self.salary = salary
        self.type = type

class Employee(BaseEmployee):
    lunchtime = Column(String(20))
    years_of_experience = Column(Integer)

    __mapper_args__ = {
        'polymorphic_identity':'employee'
    }

    def __init__(self, company, name, salary, type, lunchtime, years_of_experience):
        super().__init__(company, name, salary, type)
        self.lunchtime = lunchtime
        self.years_of_experience = years_of_experience

class Management(BaseEmployee):
    reception_hours = Column(Float(precision=1,asdecimal=True))

    __mapper_args__ = {
        'polymorphic_identity':'management'
    }

    def __init__(self, company, name, salary, type, reception_hours):
        super().__init__(company, name, salary, type)
        self.reception_hours = reception_hours
