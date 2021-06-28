import React, {useState, useContext} from 'react'
import {ActivityIndicator, Text} from 'react-native'
import {Container, Button, ButtonText, Logo, Icon} from './styles'
import {Authentication} from '@pdb/domain/usecases/auth/authentication'
import {imgLogo} from '@pdb/presentation/assets'
import {AuthContext} from '@pdb/presentation/contexts'
import {useNavigation} from '@react-navigation/native'
import {Input} from '@pdb/presentation/components'

type Props = {
  authentication: Authentication
}

const SignIn: React.FC<Props> = ({authentication}: Props) => {
  const navigation = useNavigation()
  const {saveAccount} = useContext(AuthContext)

  const [state, setState] = useState({
    identity: '',
    password: '',
    isLoading: false,
    errorMessage: '',
  })

  const handleSignIn = async (): Promise<void> => {
    const {identity, password} = state
    setState({...state, isLoading: true})
    try {
      const response = await authentication.auth({
        identity: identity,
        password: password,
      })
      setState({...state, isLoading: false})
      saveAccount(response.auth_token)
      navigation.navigate('ConfirmOrMenu')
    } catch (error: any) {
      const messageError: string = error.message
      setState({...state, isLoading: false, errorMessage: messageError})
      console.log(`Error Auth: ${messageError}`)
    }
  }

  return (
    <Container>
      <Text>{state.errorMessage}</Text>
      <Logo source={imgLogo} resizeMode="contain" />
      <Input
        placeholder="Matrícula"
        autoCorrect={false}
        autoCapitalize="none"
        onChangeText={text => setState({...state, identity: text})}
      />
      <Input
        placeholder="Senha"
        autoCorrect={false}
        autoCapitalize="none"
        secureTextEntry
        onChangeText={text => setState({...state, password: text})}
      />
      <Button onPress={handleSignIn}>
        {state.isLoading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <>
            <ButtonText>Entrar</ButtonText>
            <Icon name="log-in" size={20} color="#FFFFFF" />
          </>
        )}
      </Button>
    </Container>
  )
}

export default SignIn
