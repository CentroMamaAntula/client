export default [
  {
    name: 'Hemograma',
    code: 'A00-B99',
    sub: [
      {
        name: 'Recuento de eritrocitos',
        value: 0,
        unit: 'billones de células/L',
        reference_values: [
          { type: 'hombre', value: '4.35-5.65' },
          { type: 'mujer', value: '3.92-5.13' }
        ]
      },
      {
        name: 'Hemoglobina',
        value: 0,
        unit: 'gramos/dL',
        reference_values: [
          { type: 'hombre', value: '13.2-16.6' },
          { type: 'mujer', value: '11.6-15' }
        ]
      },
      {
        name: 'Hematocritos',
        value: 0,
        unit: '%',
        reference_values: [
          { type: 'hombre', value: '38.3-48.6' },
          { type: 'mujer', value: '35.5-44.9' }
        ]
      },
      {
        name: 'Recuento de leucocitos',
        value: 0,
        unit: 'billones de células/L',
        reference_values: [{ type: '', value: '3.4-9.6' }]
      },
      {
        name: 'Recuento de plaquetas',
        value: 0,
        unit: 'billones/L',
        reference_values: [
          { type: 'hombre', value: '135-317' },
          { type: 'mujer', value: '157-371' }
        ]
      }
    ],
    description: ''
  },
  { name: 0, code: 'C00-D49', description: 'Tumores [neoplasias]' },
  {
    name: 0,
    code: 'D50-D89',
    description:
      'Enfermedades de la sangre y de los \u00f3rganos hematopoy\u00e9ticos, y ciertos trastornos que afectan el mecanismo de la inmunidad'
  },
  {
    name: 0,
    code: 'E00-E89',
    description: 'Enfermedades endocrinas, nutricionales y metabolicas'
  },
  {
    name: 0,
    code: 'F01-F99',
    description: 'Trastornos mentales y del comportamiento'
  },
  {
    name: 0,
    code: 'G00-G99',
    description: 'Enfermedades del sistema nervioso'
  },
  {
    name: 0,
    code: 'H00-H59',
    description: 'Enfermedades del ojo y sus anexos'
  },
  {
    name: 0,
    code: 'H60-H95',
    description: 'Enfermedades del o\u00eddo y de la ap\u00f3fisis mastoides'
  },
  {
    name: 0,
    code: 'I00-I99',
    description: 'Enfermedades del sistema circulatorio'
  },
  {
    name: 0,
    code: 'J00-J99',
    description: 'Enfermedades del sistema respiratorio'
  },
  {
    name: 0,
    code: 'K00-K95',
    description: 'Enfermedades del sistema digestivo'
  },
  {
    name: 0,
    code: 'L00-L99',
    description: 'Enfermedades de la piel y del tejido subcut\u00e1neo'
  },
  {
    name: 0,
    code: 'M00-M99',
    description:
      'Enfermedades del sistema osteomuscular y del tejido conjuntivo'
  },
  {
    name: 0,
    code: 'N00-N99',
    description: 'Enfermedades del sistema genitourinario'
  },
  { name: 0, code: 'O00-O9A', description: 'Embarazo, parto y puerperio' },
  {
    name: 0,
    code: 'P00-P96',
    description: 'Ciertas afecciones originadas en el per\u00edodo perinatal'
  },
  {
    name: 0,
    code: 'Q00-Q99',
    description:
      'Malformaciones cong\u00e9nitas, deformidades y anomal\u00edas cromos\u00f3micas'
  },
  {
    name: 0,
    code: 'R00-R99',
    description:
      ' S\u00edntomas, signos y hallazgos anormales cl\u00ednicos y de laboratorio, no clasificados en otra parte'
  },
  {
    name: 0,
    code: 'S00-T88',
    description:
      'Traumatismos, envenenamientos y algunas otras consecuencias de causas externas'
  },
  {
    name: 0,
    code: 'V01-Y99',
    description: 'Causas externas de morbilidad y de mortalidad'
  },
  {
    name: 0,
    code: 'Z00-Z99',
    description:
      'Factores que influyen en el estado de salud y contacto con los servicios de salud'
  },
  {
    code: 'H60-H62',
    name: 1,
    description: 'Enfermedades del o\u00eddo externo',
    code_0: 'H60-H95'
  },
  {
    code: 'H65-H75',
    name: 1,
    description: 'Enfermedades del o\u00eddo medio y de la mastoides',
    code_0: 'H60-H95'
  },
  {
    code: 'H80-H83',
    name: 1,
    description: 'Enfermedades del o\u00eddo interno',
    code_0: 'H60-H95'
  },
  {
    code: 'H90-H95',
    name: 1,
    description: 'Otros trastornos del o\u00eddo',
    code_0: 'H60-H95'
  },
  {
    code: 'H00-H06',
    name: 1,
    description: 'Trastornos del p\u00e1rpado, aparato lagrimal y \u00f3rbita',
    code_0: 'H00-H59'
  },
  {
    code: 'H10-H13',
    name: 1,
    description: 'Trastornos de la conjuntiva',
    code_0: 'H00-H59'
  },
  {
    code: 'H15-H22',
    name: 1,
    description:
      'Trastornos de la escler\u00f3tica, c\u00f3rnea, iris y cuerpo ciliar',
    code_0: 'H00-H59'
  },
  {
    code: 'G00-G09',
    name: 1,
    description: 'Enfermedades inflamatorias del sistema nervioso central',
    code_0: 'G00-G99'
  },
  {
    code: 'G10-G13',
    name: 1,
    description:
      'Atrofias sist\u00e9micas que afectan principalmente el sistema nervioso central',
    code_0: 'G00-G99'
  },
  {
    code: 'G20-G26',
    name: 1,
    description: 'Trastornos extrapiramidales y del movimiento',
    code_0: 'G00-G99'
  },
  {
    code: 'H25-H28',
    name: 1,
    description: 'Trastornos del cristalino',
    code_0: 'H00-H59'
  },
  {
    code: 'H30-H36',
    name: 1,
    description: 'Trastornos de la coroides y de la retina',
    code_0: 'H00-H59'
  },
  { code: 'H40-H42', name: 1, description: 'Glaucoma', code_0: 'H00-H59' },
  {
    code: 'H43-H45',
    name: 1,
    description: 'Trastornos del cuerpo v\u00edtreo y del globo ocular',
    code_0: 'H00-H59'
  },
  {
    code: 'H46-H48',
    name: 1,
    description:
      'Trastornos del nervio \u00f3ptico y de las v\u00edas \u00f3pticas',
    code_0: 'H00-H59'
  },
  {
    code: 'H49-H52',
    name: 1,
    description: 'binocular, de la acomodaci\u00f3n y de la refracci\u00f3n',
    code_0: 'H00-H59'
  },
  {
    code: 'H53-H54',
    name: 1,
    description: 'Alteraciones de la visi\u00f3n y ceguera',
    code_0: 'H00-H59'
  },
  {
    code: 'F00-F09',
    name: 1,
    description:
      'Trastornos mentales org\u00e1nicos, incluidos los trastornos sintom\u00e1ticos',
    code_0: 'F01-F99'
  },
  {
    code: 'F10-F19',
    name: 1,
    description:
      'Trastornos mentales y del comportamiento debidos al uso de sustancias psicoactivas',
    code_0: 'F01-F99'
  },
  {
    code: 'F20-F29',
    name: 1,
    description:
      'Esquizofrenia, trastornos esquizot\u00edpicos y trastornos delirantes',
    code_0: 'F01-F99'
  },
  {
    code: 'F30-F39',
    name: 1,
    description: 'Trastornos del humor [afectivos]',
    code_0: 'F01-F99'
  },
  {
    code: 'F40-F48',
    name: 1,
    description:
      'Trastornos neur\u00f3ticos, trastornos relacionados con el estr\u00e9s y trastornos somatomorfos',
    code_0: 'F01-F99'
  },
  {
    code: 'E00-E07',
    name: 1,
    description: 'Trastornos de la gl\u00e1ndula tiroides',
    code_0: 'E00-E89'
  },
  {
    code: 'E10-E14',
    name: 1,
    description: 'Diabetes mellitus',
    code_0: 'E00-E89'
  },
  {
    code: 'E15-E16',
    name: 1,
    description:
      'Otros trastornos de la regulaci\u00f3n de la glucosa y de la secreci\u00f3n interna del p\u00e1ncreas',
    code_0: 'E00-E89'
  },
  {
    code: 'E20-E35',
    name: 1,
    description: 'Trastornos de otras gl\u00e1ndulas endocrinas',
    code_0: 'E00-E89'
  },
  {
    code: 'D50-D53',
    name: 1,
    description: 'Anemias nutricionales',
    code_0: 'D50-D89'
  },
  {
    code: 'D55-D59',
    name: 1,
    description: 'Anemias hemol\u00edticas',
    code_0: 'D50-D89'
  },
  {
    code: 'D60-D64',
    name: 1,
    description: 'Anemias apl\u00e1sticas y otras anemias',
    code_0: 'D50-D89'
  },
  {
    code: 'D65-D69',
    name: 1,
    description:
      'Defectos de la coagulaci\u00f3n, p\u00farpura y otras afecciones hemorr\u00e1gicas',
    code_0: 'D50-D89'
  },
  {
    code: 'D70-D77',
    name: 1,
    description:
      'Otras enfermedades de la sangre y de los \u00f3rganos hematopoy\u00e9ticos',
    code_0: 'D50-D89'
  }
];
