import { createContext, useCallback, useContext, useState } from 'react'

const CampaignContext = createContext()
const INITIAL_STATE = {
  logo: null,
  brand: '',
  name: '',
  startDate: new Date(),
  endDate: null,
  locations: [],
  target: null,
  sector: null,
  ages: [],
  sex: '',
  amount: null,
  url: '',
  publishers: [],
  listOffPublishers: []
}

const CampaignProvider = ({ children }) => {
  const [globalCampaign, setGlobalCampaign] = useState({ ...INITIAL_STATE })

  const setLogo = useCallback((logo) => {
    setGlobalCampaign(prev => ({ ...prev, logo }))
  }, [])

  return (
    <CampaignContext.Provider value={{ globalCampaign, setCampaign: setGlobalCampaign, setLogo }}>
      {children}
    </CampaignContext.Provider>
  )
}

export const useGlobalCampaigns = () => useContext(CampaignContext)

export default CampaignProvider
