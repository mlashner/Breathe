import React from 'react';
import {StyleSheet, TextInput, View, FlatList, ActivityIndicator, Text, TouchableOpacity} from 'react-native';
import HorizontalCalendar from 'breathe/src/components/HorizontalCalendar';
import ScheduleCard from '../components/ScheduleCard';
import { RFValue } from "react-native-responsive-fontsize";

class WorkshopsView extends React.Component {
    static navigationOptions = {
        title: 'WORKSHOPS',
    };

    constructor(props) {
        super(props);
        this.state = {
            searchQuery: '',
        }
        this.add = this.add.bind(this);
        this.delete = this.delete.bind(this);
    }
    
    async componentDidMount () {
        await this.fetchData();
        this.setState({ isLoading: false });
    }

    async fetchData() {}

    changeDate = (date) => {
        this.setState({
            dateSelected: date,
        });
        if (this.getFilteredData() != null
            && this.getFilteredData().length > 0) {
            this.flatlist.scrollToIndex({
                index: 0
            });
        }
    }

    handleSearch = (text) => {
        this.setState({ searchQuery: text });
    }

    clearSearch() {
        this.setState({ searchQuery: '' });
    }

    isFavorite() {}

    async add(item) {}

    async delete(item) {}

    getFilteredData() {
        const { data, dateSelected, searchQuery } = this.state;
        const selectedDateData = data[dateSelected] || [];
        if (!searchQuery) {
            return selectedDateData;
        }
        return selectedDateData.filter(item => 
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) 
            || item.description.toLowerCase().includes(searchQuery.toLowerCase())
            || item.type.toLowerCase().includes(searchQuery.toLowerCase())
            || item.location.toLowerCase().includes(searchQuery.toLowerCase())
            || item.primaryInstructor.fullName.toLowerCase().includes(searchQuery.toLowerCase())
            || item.coTeachers.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    _renderItem = ({item}) => {
        return (
            <View style={styles.list}>
                <ScheduleCard item={item} navigation={this.props.navigation}
                    user={this.state.user}
                    isFavorite={this.isFavorite(item)}
                    delete={this.delete}
                    add={this.add}/>
            </View>
        )
    }
    
    render() {
        if (this.state.isLoading) {
            return(
            <View style={styles.loader}>
                <ActivityIndicator />
            </View>
            )
        }
        else {
            return(
            <View style={styles.container}>
                <View style={styles.searchBarContainer}>
                    <TextInput
                        style={styles.searchBar}
                        placeholder="Search..."
                        value={this.state.searchQuery}
                        onChangeText={this.handleSearch}
                    />
                    <TouchableOpacity onPress={() => this.clearSearch()}>
                        <Text style={styles.clearButton}>x</Text>
                    </TouchableOpacity>
                </View>
                <HorizontalCalendar dateSelected={this.state.dateSelected} changeDate={this.changeDate}/>
                    <FlatList 
                        ref={(ref) => {this.flatlist = ref;}}
                        contentInset={{bottom: 60}}
                        contentContainerStyle={styles.flatList}
                        data={this.getFilteredData()}
                        keyExtractor={(item, index) => index.toString()}
                        extraData={this.state}
                        renderItem={(item) => this._renderItem(item, this.props)}
                    />
            </View>
            )
        }
       
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'rgb(220, 230, 232)',
    },
    loader: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    list: {
        flex: 1,
    },
    flastList: {
        flex: 1
    },
    searchBar: {
        width: "90%",
        height: 32,
        marginTop: 8,
        padding: 0,
        backgroundColor: 'rgb(220, 230, 232)',
        fontSize: RFValue(16),
        color: '#5d8da0',
        fontFamily: 'helvetica77',
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchBarContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    clearButton: {
        // position: 'absolute',
        // right: 0,
        fontSize: RFValue(16),
        color: '#5d8da0',
        fontFamily: 'helvetica77',
    }
});

export default WorkshopsView;