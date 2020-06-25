import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import TaskList from './screens/TaskLists/TaskLists';
import Auth from './screens/Auth/Auth';

const mainRoutes = {
    Auth: {
        name: 'Auth',
        screen: Auth
    },

    Home: {
        name: 'Home',
        screen: TaskList
    },
};

const mainNavigator = createSwitchNavigator(mainRoutes, {
    initialRouteName: 'Auth'
});

export default createAppContainer(mainNavigator);