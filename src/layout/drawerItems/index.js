
import Divider from '@mui/material/Divider'

import List from '@mui/material/List'

import Toolbar from '@mui/material/Toolbar'

import AppRegistrationIcon from '@mui/icons-material/AppRegistration'

import { LogoIcon } from 'assets/icons'

import NavItemLink from 'components/navItemLink'
import AddIcon from '@mui/icons-material/Add'
import CampaignIcon from '@mui/icons-material/Campaign'

const DrawerItems = ({ onClose }) => (
  <div>
    <Toolbar sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <LogoIcon width={150} fill='white' />
    </Toolbar>
    <Divider color='#5327d1' />
    <List sx={{ padding: '20px 10px' }}>
      <NavItemLink
        to='/campaigns'
        icon={CampaignIcon}
        text='Campañas'
        onClose={onClose}
        end
      />
      <NavItemLink
        to='/campaigns/create'
        startWith
        icon={AddIcon}
        text='Nueva campaña'
        onClose={onClose}
      />
      <NavItemLink
        to='/activity'
        icon={AppRegistrationIcon}
        text='Actividad'
        onClose={onClose}
        end
      />
    </List>
  </div>
)

export default DrawerItems
