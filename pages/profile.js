
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

function Profile({ isPassedToWithAuthenticator, signOut, user }) {
  if (!isPassedToWithAuthenticator) {
    throw new Error(`isPassedToWithAuthenticator was not provided`);
  }

  return (
    <Authenticator className="my-6">
      {({ signOut, user }) => (
        <div className="w-full flex justify-center">
          <div className="my-12 w-10/12 border border-pink-400 flex">
            <div>
              <h2>Dine Produkter</h2>
            </div>
            <div className="border-pink-800 border-l ml-auto w-4/12 pl-2">
              <h1>Hello {user.username}</h1>
              <button onClick={signOut}>Sign out</button>
            </div>
            
          </div>
        </div>
        
      )}
    </Authenticator>
  );
}

export default Profile

export async function getStaticProps() {
  return {
    props: {
      isPassedToWithAuthenticator: true,
    },
  };
}