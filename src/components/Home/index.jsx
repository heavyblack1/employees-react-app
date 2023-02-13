import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faUser, faTasks } from '@fortawesome/free-solid-svg-icons';
import { PageContainer, EmployeeList, EmployeeItem, EmployeeForm, Buttons, TabButton, RemoveEmployeeBtn, PlanButton } from "./homeStyles";
import { employees } from "./EmployeesData";

export default function Home() {
    // ----------------------------------------------------------------
    // setters for class properties
    // ----------------------------------------------------------------

    // get count of employees from file
    const employeesCount = useRef(employees.length);
    const [listOfEmployees, setListOfEmployees] = useState(employees);
    const [activeTab, setActiveTab] = useState('list-of-employees');
    const [storeTask, setStoreTask] = useState({
        meters: 27,
        time: 6
    });
    const [tempStoreTask, setTempStoreTask] = useState({
        meters: "",
        time: "",
    });
    const [addEmployee, setAddEmployee] = useState({
        id: (employeesCount.current + 1),
        name: "",
        sex: ""
    });
    const [workforceMeters, setWorkforceMeters] = useState(0);
    const [workforceRequirement, setWorkforceRequirement] = useState(storeTask.meters / storeTask.time);

    // called upon change
    const handleChange = (e) => {
        // {object} ...addEmployee add all previous employees [name]: value
        setAddEmployee({ ...addEmployee, [e.target.name]: e.target.value });
    };
    // add employee
    const handleAddEmployee = async (e) => {
        e.preventDefault();

        // push employee in to list of employees
        await setListOfEmployees((listOfEmployees) => {
            return [...listOfEmployees, addEmployee];
        });
        employeesCount.current++;
        await setAddEmployee({
            id: (employeesCount.current + 1),
            name: "",
            sex: ""
        });
    };
    // remove employee
    const RemoveEmployee = (id) => {
        // keep not selected employees
        setListOfEmployees(listOfEmployees.filter(employee => employee.id !== id));
    };
    // Handle task
    const taskManagement = (e) => {
        setTempStoreTask({ ...tempStoreTask, [e.target.name]: e.target.value });
    };
    // add task
    const addTask = async () => {
        const storageValue = tempStoreTask;
        let newStoreTask = {};
        const keys = Object.keys(storageValue);
        keys.map((key) => {
            if (Number(storageValue[key])) {
                newStoreTask[key] = Number(storageValue[key]);
            }
            else {
                newStoreTask[key] = Number(storeTask[key]);
            }
        });
        console.log(newStoreTask);
        await setStoreTask(newStoreTask);
        await setTempStoreTask({ meters: "", time: "" });

    };

    useEffect(() => {
        // count requirements

        setWorkforceMeters(0);
        setWorkforceRequirement(storeTask.meters / storeTask.time);
        for (let i = 0; i < listOfEmployees.length; i++) {
            console.log(listOfEmployees[i]);
            if (listOfEmployees[i].sex === 'M') {
                setWorkforceMeters(prevValue => prevValue + 1);
            }
            else {
                setWorkforceMeters(prevValue => prevValue + 0.5);
            }
        }

        console.log(`Meters done in 1 hour: ${workforceMeters}`);
        console.log(`Meters required in 1 hour: ${(storeTask.meters / storeTask.time)}`);
        if (workforceMeters >= storeTask.meters / storeTask.time) {
            console.log("Enough workforce");
        }
        else {
            console.log("Not enough workforce!");
        }

    }, [listOfEmployees, storeTask]);
    // Allow switch between tabs
    const switchTab = (e, newValue) => {
        e.preventDefault();
        const newActiveTab = newValue;
        setActiveTab(newActiveTab);
    };

    return (
        <PageContainer>
            <h1>Plánování Výkopových Prací</h1>
            <Buttons>
                <TabButton name="list-of-employees" activeTab={activeTab} onClick={(event) => { switchTab(event, 'list-of-employees'); }}>
                    <FontAwesomeIcon icon={faUser} style={{ color: "#03A9F4" }} />&nbsp;
                    Zaměstnanci
                </TabButton>
                <TabButton name="store-storage" activeTab={activeTab} onClick={(event) => { switchTab(event, 'store-storage'); }}>
                    <FontAwesomeIcon icon={faTasks} style={{ color: "#4CAF50" }} />&nbsp;
                    Úkol
                </TabButton>
            </Buttons>
            {(activeTab === 'list-of-employees') &&
                <>
                    <EmployeeList name="employeeList">
                        {
                            listOfEmployees.map((employee) => (
                                <EmployeeItem key={employee.id} name={employee.name}>
                                    {employee.name} / {employee.sex}
                                    <RemoveEmployeeBtn
                                        onClick={() => { RemoveEmployee(employee.id); }}
                                    >
                                        <FontAwesomeIcon icon={faMinus} style={{ color: "#B71C1C" }} />
                                    </RemoveEmployeeBtn>
                                </EmployeeItem>
                            ))
                        }
                    </EmployeeList>
                    <EmployeeForm name="employeeForm">
                        <input
                            type="text"
                            placeholder="Jméno zaměstnance"
                            className="inputClass"
                            name="name"
                            value={addEmployee.name}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            placeholder="Pohlaví zaměstnance (M/F)"
                            className="inputClass"
                            name="sex"
                            value={addEmployee.sex}
                            onChange={handleChange}
                        />
                        <button
                            className="inputClass"
                            onClick={handleAddEmployee}
                        >
                            Přidat
                        </button>
                    </EmployeeForm>
                </>
            }
            {(activeTab === 'store-storage') &&
                <>
                    <EmployeeForm style={{ flexDirection: 'column ' }}>
                        <div
                            className="inputClass"
                            style={{ color: 'white', height: 'auto' }}
                        >
                            <h2>Aktuální Úkol</h2>
                            <ul>
                                <li>Délka Výkopu: {storeTask.meters}</li>
                                <li>Čas: {storeTask.time}</li>
                            </ul>
                        </div>
                        <p>Vykopáno za 1h je {workforceMeters} metrů cíl je {workforceRequirement} metrů.</p>
                        <input
                            type="number"
                            placeholder="Požadovaný výkop (metry)"
                            className="inputClass"
                            name="meters"
                            value={tempStoreTask.meters}
                            onChange={taskManagement}
                        />
                        <input
                            type="number"
                            placeholder="Čas (s)"
                            className="inputClass"
                            name="time"
                            value={tempStoreTask.time}
                            onChange={taskManagement}
                        />
                        <PlanButton
                            className="inputClass"
                            id="planButton" name="assignment" employeePerformance={workforceMeters} conditionRequirement={workforceRequirement}
                            onClick={addTask}
                        >
                            Spočítat!
                        </PlanButton>
                    </EmployeeForm>
                </>
            }
        </PageContainer>
    );
}
