import * as React from 'react';
import { Firebase } from '../../helpers';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { setIncidentList } from '../../store/incidents/actions';

interface IncidentListenerProps {
  dispatch: Dispatch;
}

class IncidentListener extends React.PureComponent<IncidentListenerProps, {}> {
  private incidientListener?: () => void;

  public componentDidMount() {
    this.createListener();
  }

  public componentWillUnmount() {
    this.disableListener();
  }

  public createListener() {
    const { dispatch } = this.props;

    this.disableListener();

    this.incidientListener = Firebase.incidentListener({
      onChange: incidents => {
        dispatch(setIncidentList(incidents));
      },
    });
  }

  public disableListener() {
    if (this.incidientListener) {
      this.incidientListener();
      this.incidientListener = undefined;
    }
  }

  public render() {
    return null;
  }
}

export default connect()(IncidentListener);
