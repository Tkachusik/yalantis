import './App.css';
import Employees from './Employees';
import Birthday from './birthEmployees';
import  {DataProviderContext}  from './ProviderContext';

function App() {
  return (
    <DataProviderContext>
      <div className="main">
        <div className="container">
          <div className="row">
            <div className="col-1-3">
              <Employees />
            </div>
            <div className="col-2-3">
              <Birthday />
            </div>
          </div>
        </div>
      </div>
    </DataProviderContext>
  );
}

export default App;
