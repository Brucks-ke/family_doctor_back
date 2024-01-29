/**
 * @description  居民的信息
 */
type Resident = {
  id: string;
  name: string;
  IDCard: string;
  gender: string | null;
  birthday: string;
  tel: string;
  address: string;
};

type Organ = {
  id: string;
  name: string;
};

type Team = {
  id: string;
  name: string;
};

type Service = {
  id: string;
  name: string;
  price: number;
  period: number;
};

type Doctor = {
  id: string;
  name: string;
};

export type ResidentInformationType = {
  id: string;
  residentId: string;
  number: string;
  status: number;
  organId: string;
  teamId: string;
  doctorId: string;
  serviceId: string;
  type: string;
  subscribeTime: string;
  takingEffectTime: string;
  notes: string;
  flag: number;
  resident: Resident;
  organ: Organ;
  team: Team;
  service: Service;
  doctor: Doctor;
  labelArr: string[];
};
