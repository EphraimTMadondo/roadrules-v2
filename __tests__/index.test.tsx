// __tests__/index.test.jsx

import { render } from '@testing-library/react';
import Home from '../pages/index';

describe('Home', () => {
  const { container } = render(<Home />);

  it('matches previous snapshot', () => {
    // render( <Home /> )

    expect(container).toMatchSnapshot();
  });

  // it('renders road rules logo', () => {
  //   // render( <Home /> )

  //   const rrLogo = screen.getByRole(roles.rrLogo);

  //   expect(rrLogo).toBeInTheDocument();
  // });

  // it('renders traffic security council logo', () => {
  //   // render( <Home /> )

  //   const tscLogo = screen.getByRole(roles.tscLogo);

  //   expect(tscLogo).toBeInTheDocument();
  // });
});
