/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react'
import {HeaderStack, Spinner} from '@pdb/presentation/components'
import {Image, Alert} from 'react-native'
import {
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Left,
  Body,
  Container,
} from 'native-base'
import {imgCamera, imgLogo} from '@pdb/presentation/assets'
import {Styles} from './styles'
import {
  RemoteEditOrder,
  RemoteGetOrder,
  RemoteManageOs,
} from '@pdb/data/usecases'
import {OrderDataModel} from '@pdb/domain/models/order-model'

type Props = {
  editOrder: RemoteEditOrder
  managerOrder: RemoteManageOs
  getOrder: RemoteGetOrder
}

const ManagerManageOS: React.FC<Props> = ({
  editOrder,
  managerOrder,
  getOrder,
}: Props) => {
  const [isLoading, setIsLoading] = useState(true)
  const [order, setOrder] = useState<OrderDataModel>({} as OrderDataModel)

  const loadOs = async (): Promise<void> => {
    try {
      const response = await getOrder.get()
      setOrder(response)
      setIsLoading(false)
    } catch (error: any) {
      Alert.alert(error.message)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadOs()
  }, [])

  return (
    <>
      <HeaderStack title="OS" />
      <Container style={Styles.container}>
        <Content>
          <Card>
            {isLoading ? (
              <>
                <CardItem cardBody>
                  <Spinner />
                </CardItem>
              </>
            ) : (
              <>
                <CardItem>
                  <Left>
                    <Thumbnail source={imgLogo} />
                    <Body>
                      <Text>OS: {order.data.reference}</Text>
                      <Text note>
                        Motorista: {order.data.owner.employee_name}
                      </Text>
                    </Body>
                  </Left>
                </CardItem>
                <CardItem cardBody>
                  <Image
                    source={
                      order.meta.links.image_url
                        ? {uri: order.meta.links.image_url}
                        : imgCamera
                    }
                    style={Styles.imageTitle}
                  />
                </CardItem>
                <CardItem>
                  <Left>
                    <Body>
                      <Text>Veículo: {order.data.vehicle.car_number}</Text>
                      <Text>Categoria: {order.data.problem.category.name}</Text>
                      <Text>Problema: {order.data.problem.description}</Text>
                    </Body>
                  </Left>
                </CardItem>
              </>
            )}
          </Card>
        </Content>
      </Container>
    </>
  )
}

export default ManagerManageOS
