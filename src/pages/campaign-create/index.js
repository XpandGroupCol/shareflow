import CampaignProvider from 'providers/CampaignProvider'
import { Outlet } from 'react-router-dom'

const CreatePage = () => {
  return (
    <CampaignProvider>
      <Outlet />
    </CampaignProvider>

  )
}

export default CreatePage
