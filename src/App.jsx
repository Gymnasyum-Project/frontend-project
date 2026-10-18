import {Route, Routes} from "react-router-dom"
import DashboardPage from './pages/DashboardPage'
import CustomerPage from './pages/CustomerPage'
import PirorityFollowUpPage from './pages/PirorityFollowUpPage'
import InputPage from './pages/InputPage'
import SettingPage from './pages/SettingPage'

function App() {


  return(
    <div>
      <main>
        <Routes>
          <Route path="/" element={<DashboardPage/>}/>
          <Route path="/customer" element={<CustomerPage/>}/>
          <Route path="/priority-followup" element={<PirorityFollowUpPage/>}/>
          <Route path="/input-page" element={<InputPage/>}/>
          <Route path="/setting" element={<SettingPage/>}/>
        </Routes>
      </main>
    </div>
  )
}

export default App
