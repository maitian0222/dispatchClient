import React from 'react';

export interface ParamsType {
  errorTitle?: string;
}

// tslint:disable-next-line:no-empty-interface
export interface PropsType {}

export interface StateType {
  error: boolean;
  errorMessage: string;
}

export default function withErrorCatch({ errorTitle }: ParamsType = {}) {
  return function createComponent(Comp: React.ReactType) {
    return class Component extends React.Component<any, StateType> {
      public static defaultProps = Comp.defaultProps || {};
      constructor(props: any) {
        super(props);

        this.state = {
          error: false,
          errorMessage: '',
        };
      }

      // tslint:disable-next-line:no-any
      public componentDidCatch(error: any, info: any) {
        if (error) {
          this.setState({
            error: true,
            errorMessage: `${error}`,
          });
        }
      }

      public render() {
        return this.state.error ? (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {errorTitle || this.state.errorMessage}
          </div>
        ) : (
          <Comp {...this.props} />
        );
      }
    };
  };
}
