import './App.scss';
import Navbar from './components/Navbar';
import Shop from './pages/Shop';

import { Layout } from 'antd'
const { Header, Content, Footer } = Layout;;

function App() {
  return (
    <div className="App">
      <Layout>
        <Header  >
          <Navbar/>
        </Header>
        <Content>
          <Shop />
        </Content>
        <Footer >
          Take Home Assignment Project By Matimon Nakdook
        </Footer>
      </Layout>
    </div>
  );
}


export default App;
