import FilterModal from './filterModal'
import { useState } from 'react'
import InputSeach from 'components/inputSearch'

const Filters = () => {
  const [filterModal, setFilterModal] = useState(false)

  const handleOpenFilters = () => {
    setFilterModal(prev => !prev)
  }

  return (
    <div className='filterSection'>
      <InputSeach placeholder='Buscar por marca o campaña' />
      <div>
        <FilterModal
          open={filterModal}
          onClose={handleOpenFilters}
        />
      </div>

    </div>
  )
}

export default Filters
