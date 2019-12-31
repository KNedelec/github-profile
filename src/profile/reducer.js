import {getDefaultProfileState} from './state';

export function profileReducer(state, action) {
  switch(action.type) {
    case 'TOKEN_CHANGED':
      return {
        ...getDefaultProfileState(),
      }
    case 'PROFILE_RECEIVED':
      const { avatarUrl, name, login, bio } = action.profile;
      return {
        ...state,
        isFresh: true,
        avatarUrl,
        bio: `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum laoreet aliquam arcu, a aliquet risus posuere vitae. Aliquam auctor blandit neque, id sodales libero vulputate ac. Donec auctor, libero eu vulputate mollis, turpis neque commodo massa, at auctor elit orci et ex. Integer vitae metus congue, vestibulum felis eu, vestibulum felis. Duis nec ex a est ultrices scelerisque ut non urna. Aliquam accumsan purus erat, eu lacinia dui rhoncus ut. Proin aliquet eros sit amet justo aliquam, at scelerisque nisl accumsan.
        `,
        login,
        name,
      }
    default: return state;
  }
}
