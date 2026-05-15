

import { gasRequest } from "./api";
import type { Employee } from "../types/user.types";

export async function getEmployeesService(): Promise<Employee[]> {
  const res = await gasRequest<{ data: Employee[] }>('getEmployees');
  return res.data;
}