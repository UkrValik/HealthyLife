import React from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { Icon, ListItem } from 'react-native-elements';
import CATEGORIES from '../shared/Categories.json';

class Categories extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            categories: CATEGORIES,
        };
    }

    static navigationOptions = {
        title: 'Categories',
    }

    FlatListItemSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: '100%',
                    backgroundColor: '#291000',
                }}
                />
        );
    }

    render() {

        const { navigate } = this.props.navigation;

        const renderCategory = ({ item }) => (
            <View key={item.id}>
                <ListItem
                    containerStyle={styles.listItem}
                    titleStyle={{color: '#291000'}}
                    title={item.name}
                    rightIcon={() => (<Icon name='keyboard-arrow-right' type='material' color='#67423C' size={24} />)}
                    leftIcon={() => (<Icon name={item.icon} type={item.type} color='#67423C' size={24} />)}
                    onPress={() => navigate('Subcategories', { subcategories: item.subcategories, title: item.name })}
                    underlayColor='#FFFFEB'
                    activeOpacity={0.65}
                    />
            </View>
        )

        return(
            <View style={styles.container}>
                <FlatList
                    contentContainerStyle={{paddingBottom: '0%'}}
                    data={this.state.categories}
                    renderItem={renderCategory}
                    keyExtractor={(item) => item.id.toString()}
                    ItemSeparatorComponent={this.FlatListItemSeparator}
                    ListFooterComponent={this.FlatListItemSeparator}
                    />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFEB',
        flex: 1,
    },
    text: {
        margin: 0,
        fontSize: 22,
        color: '#291000',
        fontFamily: Platform.OS === 'android' ? 'serif' : 'Helvetica'
    },
    listItem: {
        backgroundColor: '#FFFFEB',
        padding: 10,
        margin: 5,
    }
});

export default Categories;
