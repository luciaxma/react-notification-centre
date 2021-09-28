import './App.css';
import Notifications from './Notifications';
import data from './Notifications/data';

function App() {
  return (
    <div className="App">
     <Notifications
      data={data}
     />
    </div>
  );
}

export default App;
