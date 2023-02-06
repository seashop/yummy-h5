import React, {useState} from 'react'
import { Tabs, TabPane } from '@nutui/nutui-react';
import './index.module.scss'
export default function index() {
  const [tabvalue, setTabvalue] = useState('0');
  return (
    <div className='takeway-container'>
      <Tabs value={tabvalue} onChange={({ paneKey }) => {
        setTabvalue(paneKey)
      }}>
        <TabPane title="堂食">
          <div className='canteen'>
            <p className='text'>请确认你已在店内</p>
          </div>
        </TabPane>
        <TabPane title="自提">
          <div className='deliver'>

          </div>
        </TabPane>
      </Tabs>
    </div>
  )
}
