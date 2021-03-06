import React, {useContext} from 'react'
import {AuthContext} from '@pdb/presentation/contexts'
import AppRoutes from '@pdb/routes/app.routes'
import {CreateConfirmPage} from '@pdb/main/factories'

const ConfirmOrMenu: React.FC = () => {
  const {user} = useContext(AuthContext)
  return user.confirmation ? (
    <AppRoutes />
  ) : (
    <CreateConfirmPage userIdParams={user.id} />
  )
}

export default ConfirmOrMenu
