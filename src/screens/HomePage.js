import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import Constants from 'expo-constants';
import Services from 'breathe/src/services';

class LogoTitle extends React.Component {
    render() {
      return (
        <Image
          source={require('../../assets/img/banner.jpg')}
          style={styles.banner}
        />
      );
    }
  }

class HomeScreen extends React.Component { 
    constructor(props) {
      super(props);
      this.state = {};
    }  

    componentWillMount () {
      this.getOrCreateUser();
    }

    async getOrCreateUser() {
      let user = await Services.Users.getUser(Constants.installationId);
      if (user == null) {
        user = await Services.Users.createUser({
          installationId: Constants.installationId,
        });
      }
      this.setState({user: user});
    }

    static navigationOptions = {
        headerTitle: <LogoTitle />,
        backgroundColor: 'rgb(220, 230, 232)'
    };
 
    render(){
        return (
          <View style={styles.container}>
            <View style={styles.buttonsContainer}>
                <View>
                <TouchableOpacity
                style={styles.buttons}
                activeOpacity = { .5 }
                onPress={() => this.props.navigation.navigate('Schedule', {user: this.state.user})}
                >
                <Text style={styles.TextStyle}> SCHEDULE </Text>       
                </TouchableOpacity>
                </View>
                <View>
                <TouchableOpacity
                style={styles.buttons}
                activeOpacity = { .5 }
                onPress={() => this.props.navigation.navigate('Map')}
                >
                <Text style={styles.TextStyle}> MAP </Text>       
                </TouchableOpacity>
                </View>
            
                <View>
                <TouchableOpacity
                style={styles.buttons}
                activeOpacity = { .5 }
                onPress={() => this.props.navigation.navigate('Favorites', {user: this.state.user})}
                >
                <Text style={styles.TextStyle}> FAVORITES </Text> 
                </TouchableOpacity>
                </View> 
                <View>
                <TouchableOpacity
                style={styles.buttons}
                activeOpacity = { .5 }
                onPress={() => this.props.navigation.navigate('Gallery')}
                >
                <Text style={styles.TextStyle}> GALLERY </Text>       
                </TouchableOpacity>
                </View>      
            </View>

            <Image style={styles.footer}
                source={require('../../assets/img/breathe2.jpg')}
            />

            </View>
            
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: 'rgb(220, 230, 232)',
    },
    banner: {
      marginTop: 30,
    },
    buttons: {
      borderRadius: 10,
      height: 60,
      width: 320,
      margin: 25,
      backgroundColor: 'rgb(82, 141, 161)',
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: 'rgba(0,0,0, .4)', // IOS
      shadowOffset: { height: 1, width: 1 }, // IOS
      shadowOpacity: 1, // IOS
      shadowRadius: 1, //IOS
      elevation: 2, // Android
    },
    TextStyle: {
      color: 'white',
      textAlign:'center',
      fontSize: 16,
      fontWeight: 'bold',
    },
    buttonsContainer: {
      marginTop: '10%',
    },
    footer: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      height: '25%',
    }
  });

export default HomeScreen;
