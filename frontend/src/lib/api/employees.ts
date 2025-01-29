interface Employee {
  id: string
  employee_id: string
  personal_details: {
    first_name: string
    last_name: string
  }
  departments: {
    name: string
  } | null
  positions: {
    title: string
  } | null
  employment_status: string
  start_date: string
}

const dummyEmployees: Employee[] = [
  {
    id: '1',
    employee_id: 'EMP001',
    personal_details: {
      first_name: 'John',
      last_name: 'Doe'
    },
    departments: {
      name: 'Engineering'
    },
    positions: {
      title: 'Senior Developer'
    },
    employment_status: 'active',
    start_date: '2023-01-15'
  },
  {
    id: '2',
    employee_id: 'EMP002',
    personal_details: {
      first_name: 'Jane',
      last_name: 'Smith'
    },
    departments: {
      name: 'Marketing'
    },
    positions: {
      title: 'Marketing Manager'
    },
    employment_status: 'active',
    start_date: '2023-02-01'
  }
]

export async function getEmployees() {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500))
  return dummyEmployees
}

export type { Employee }