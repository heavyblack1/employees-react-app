import styled from 'styled-components';

export const PageContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    width: 100vw;
    align-items: center;
    justify-content: center;
    background-color: #212121;
`;


export const EmployeeList = styled.div`
  display: flex;
  flex-direction: column;
  width: 600px;
  background: trasparent;
`;

export const EmployeeItem = styled.div`
  display: block;
  height: 2rem;
  padding: 0.2rem 1rem 0.2rem 1rem;
  align-items: center;
  justify-content: center;
  justify-content: space-between;
  background-color: #607D8B;
  &:nth-child(even) {
    background-color: #78909C;
  }
`;

export const EmployeeForm = styled(EmployeeList)`
  flex-direction: row;
  margin:  50px 0;
  padding-top: 0;
  justify-content: space-between;
  align-items: center;
`;

export const Buttons = styled(EmployeeForm)`
  margin: 30px 0;
  height: 40px;
`;

export const TabButton = styled.button`
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 48%;
  border: 1px solid white;
  color: white;
  font-size: 20px;
  cursor: pointer;
  background-color: transparent;
  /* Active tab lighter */
  ${props => {
        if (props.name === props.activeTab) {
            return `
        background-color: rgba(255, 255, 255, 0.3);
      `;
        }
    }}
`;

export const RemoveEmployeeBtn = styled.div`
  display: flex;
  position: relative;
  z-index: 50;
  height: 1rem;
  width: 1rem;
  margin: 0;
  padding: 0;
  align-items: center;
  justify-content: center;
  color: #BF360C;
  top: -20px;
  right: -550px;
  cursor: pointer;
`;

export const PlanButton = styled.button`
    border-radius: 8px;
    border: 2px solid transparent;
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    background-color: #1a1a1a;
    cursor: pointer;
    transition: border-color 0.25s;
  ${props => {
        if (props.employeePerformance >= props.conditionRequirement) {
            return `
        background-color: #43A047;
      `;
        } else {
            return `
        background-color: #B71C1C;
      `;
        }
    }}
`;