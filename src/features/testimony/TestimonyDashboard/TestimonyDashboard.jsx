import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Grid, Loader } from 'semantic-ui-react';
import TestimonyList from '../TestimonyList/TestimonyList';
import TestimonyActivity from '../TestimonyActivity/TestimonyActivity';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { getTestimonyDashboard } from '../testimonyActions';

const mapStateToProps = (state) => ({
  testimony:state.testimony,
  loading: state.async.loading

});

const mapDispatchToProps = {
    getTestimonyDashboard
}

class TestimonyDashboard extends Component {

    state = {
        moreTestimonies: false,
        loadingInitial: true,
        loadedTestimonies: []
    }

   async componentDidMount() {
        let next = await this.props.getTestimonyDashboard();
        if(next && next.docs && next.docs.length > 1) {
            this.setState({
                moreTestimonies: true,
                loadingInitial: false
            })
        }
    }

    //for pagination -> infinte scrolling...
    componentWillReceiveProps(nextProps) {
        if(this.props.testimony !== nextProps.testimony) {
            this.setState({
                loadedTestimonies: [...this.state.loadedTestimonies, ...nextProps.testimony]
            })
        }
    }

    //getting the next testimony from the last testimony filtered
    getNextTestimony = async () => {
        const { testimony } = this.props;
        let lastTestimony = testimony && testimony[testimony.length -1];

        let next = await this.props.getTestimonyDashboard(lastTestimony);
            if(next && next.docs && next.docs.length <= 1) {
                this.setState({
                    moreTestimonies: false
                })
            }
    }


    render() {
        const { loading } = this.props;
        const { moreTestimonies, loadedTestimonies } = this.state;
        if (this.state.loadingInitial) return <LoadingComponent inverted={true} />;
        return (
            
            <Grid>
                <Grid.Column width={10}>
                    <TestimonyList testimonies={loadedTestimonies}
                        loading={loading}
                        moreTestimonies={moreTestimonies}
                        getNextTestimony={this.getNextTestimony}
                     />
                </Grid.Column>
                <Grid.Column width={6}>
                    <TestimonyActivity/>
                </Grid.Column>
                <Grid.Column width={10}>


                {/* spinner */}
                   <Loader active={loading}/>
                </Grid.Column>
            </Grid>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(
    firestoreConnect([{ collection: 'testimonies' }])(TestimonyDashboard)
);