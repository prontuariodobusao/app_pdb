/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react'
import {Container} from './styles'
import {FollowOsTabContent, Spinner} from '@pdb/presentation/components'
import {Header, Body, Title, Tabs, Tab} from 'native-base'
import {FlatList} from 'react-native'
import {RemoteListOrdersOpenedsAndCloseds} from '@pdb/data/usecases'
import {ListOrdersOpenedsAndClosedsModel} from '@pdb/domain/models/order-model'

type Props = {
  listOrdersOpenedsAndCloseds: RemoteListOrdersOpenedsAndCloseds
}

const FollowOs: React.FC<Props> = ({listOrdersOpenedsAndCloseds}: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [state, setState] = useState<ListOrdersOpenedsAndClosedsModel>(
    {} as ListOrdersOpenedsAndClosedsModel,
  )
  const loadOrders = async (): Promise<void> => {
    setIsLoading(true)
    try {
      const response = await listOrdersOpenedsAndCloseds.get()
      setState(response)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadOrders()
  }, [])

  return (
    <>
      <Header>
        <Body>
          <Title>ACOMPANHAR OS</Title>
        </Body>
      </Header>
      <Container>
        <Tabs>
          <Tab heading="Abertas">
            {isLoading ? (
              <Spinner />
            ) : (
              <FlatList
                refreshing={isLoading}
                onRefresh={loadOrders}
                data={state.openeds}
                renderItem={obj => {
                  return <FollowOsTabContent routeName="ShowOs" os={obj.item} />
                }}
              />
            )}
          </Tab>
          <Tab heading="Fechadas">
            {isLoading ? (
              <Spinner />
            ) : (
              <FlatList
                refreshing={isLoading}
                onRefresh={loadOrders}
                data={state.closeds}
                renderItem={obj => {
                  return <FollowOsTabContent routeName="ShowOs" os={obj.item} />
                }}
              />
            )}
          </Tab>
        </Tabs>
      </Container>
    </>
  )
}

export default FollowOs
