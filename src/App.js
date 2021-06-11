import 'react-perfect-scrollbar/dist/css/styles.css';
import React from 'react';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import theme from 'src/theme';
import routes from 'src/routes';

import AuthState from './context/auth/authState';
import PacienteState from './context/paciente/pacienteState';
import CHState from './context/clinic_history/CHState';
import NursingState from './context/nursing/NursingState';
import BedState from './context/bed/bedState';
import MentalQueryState from './context/mental_query/mentalQueryState';
import XrayState from './context/xray/xrayState';
import KinesiologyState from './context/kinesiology/kinesiologyState';
import NutritionState from './context/nutrition/nutritionState';
import LaboratoryState from './context/laboratory/laboratoryState';
import StatisticsState from './context/statistics/statiticsState';

const App = () => {
  const routing = useRoutes(routes);

  return (
    <AuthState>
      <PacienteState>
        <CHState>
          <NursingState>
            <MentalQueryState>
              <BedState>
                <XrayState>
                  <KinesiologyState>
                    <NutritionState>
                      <LaboratoryState>
                        <StatisticsState>
                          <ThemeProvider theme={theme}>
                            <GlobalStyles />
                            {routing}
                          </ThemeProvider>
                        </StatisticsState>
                      </LaboratoryState>
                    </NutritionState>
                  </KinesiologyState>
                </XrayState>
              </BedState>
            </MentalQueryState>
          </NursingState>
        </CHState>
      </PacienteState>
    </AuthState>
  );
};

export default App;
