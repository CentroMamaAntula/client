import * as Yup from 'yup';

export const initialValues = {
  date: new Date().toJSON().slice(0, 10),
  rtoGr: '',
  hb: '',
  hto: '',
  rdw: '',
  vmc: '',
  hcm: '',
  chcm: '',
  rtogb: '',
  nj: '',
  e: '',
  b: '',
  m: '',
  l: '',
  rtoPlaq: '',
  tp: '',
  porcAct: '',
  kptt: '',
  rin: '',
  dimenD: '',
  ferritina: '',
  glucemia: '',
  urea: '',
  creatinina: '',
  got: '',
  gpt: '',
  fal: '',
  bilFoml: '',
  BilD: '',
  BilInd: '',
  grupoSang: '',
  factorRH: '',
  vsg: '',
  ldh: '',
  pcr: '',
  ph: '',
  pCO2: '',
  pO2: '',
  sat: '',
  HCO3: '',
  excB: '',
  nat: '',
  k: '',
  cl: '',
  orina: '',
  observations: ''
};

export const validationSchema = {
  date: Yup.date('Debe ingresar una fecha valida'),
  rtoGr: Yup.number('Debe ingresar un valor valido'),
  hb: Yup.number('Debe ingresar un valor valido'),
  hto: Yup.number('Debe ingresar un valor valido'),
  rdw: Yup.number('Debe ingresar un valor valido'),
  vmc: Yup.number('Debe ingresar un valor valido'),
  hcm: Yup.number('Debe ingresar un valor valido'),
  chcm: Yup.number('Debe ingresar un valor valido'),
  rtogb: Yup.number('Debe ingresar un valor valido'),
  nj: Yup.number('Debe ingresar un valor valido'),
  e: Yup.number('Debe ingresar un valor valido'),
  b: Yup.number('Debe ingresar un valor valido'),
  m: Yup.number('Debe ingresar un valor valido'),
  l: Yup.number('Debe ingresar un valor valido'),
  rtoPlaq: Yup.number('Debe ingresar un valor valido'),
  tp: Yup.number('Debe ingresar un valor valido'),
  porcAct: Yup.number('Debe ingresar un valor valido'),
  kptt: Yup.number('Debe ingresar un valor valido'),
  rin: Yup.number('Debe ingresar un valor valido'),
  dimenD: Yup.number('Debe ingresar un valor valido'),
  ferritina: Yup.number('Debe ingresar un valor valido'),
  glucemia: Yup.number('Debe ingresar un valor valido'),
  urea: Yup.number('Debe ingresar un valor valido'),
  creatinina: Yup.number('Debe ingresar un valor valido'),
  got: Yup.number('Debe ingresar un valor valido'),
  gpt: Yup.number('Debe ingresar un valor valido'),
  fal: Yup.number('Debe ingresar un valor valido'),
  bilFoml: Yup.number('Debe ingresar un valor valido'),
  BilD: Yup.number('Debe ingresar un valor valido'),
  BilInd: Yup.number('Debe ingresar un valor valido'),
  grupoSang: Yup.string('Debe ingresar un valor valido'),
  factorRH: Yup.string('Debe ingresar un valor valido'),
  vsg: Yup.number('Debe ingresar un valor valido'),
  ldh: Yup.number('Debe ingresar un valor valido'),
  pcr: Yup.number('Debe ingresar un valor valido'),
  ph: Yup.number('Debe ingresar un valor valido'),
  pCO2: Yup.number('Debe ingresar un valor valido'),
  pO2: Yup.number('Debe ingresar un valor valido'),
  sat: Yup.number('Debe ingresar un valor valido'),
  HCO3: Yup.number('Debe ingresar un valor valido'),
  excB: Yup.number('Debe ingresar un valor valido'),
  nat: Yup.number('Debe ingresar un valor valido'),
  k: Yup.number('Debe ingresar un valor valido'),
  cl: Yup.number('Debe ingresar un valor valido'),
  orina: Yup.string('Debe ingresar un valor valido'),
  observations: Yup.string('Debe ingresar un valor valido')
};
