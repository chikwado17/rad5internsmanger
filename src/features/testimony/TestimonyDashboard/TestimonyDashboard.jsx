import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Grid, Loader } from 'semantic-ui-react';
import TestimonyList from '../TestimonyList/TestimonyList';
import TestimonyActivity from '../TestimonyActivity/TestimonyActivity';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { getTestimonyDashboard } from '../testimonyActions';



//query firestore to get activity collection
//remember to pass the query down to firestoreconnect on footer code
const query = [
    {
        collection: 'activity',
        orderBy: ['timestamp', 'desc'],
        limit:5
    }
]



const mapStateToProps = (state) => ({
  testimony:state.testimony,
  loading: state.async.loading,
  activities: state.firestore.ordered.activity

});

const mapDispatchToProps = {
    getTestimonyDashboard
}

class TestimonyDashboard extends Component {

    state = {
        moreTestimonies: false,
        loadingInitial: true,
        loadedTestimonies: [],
        contextRef: {}
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


     //handling contextref for sticky sementic react
    //remember pass down to eventactivity
    handleContextRef = (contextRef) => {
        this.setState({ contextRef })
    }


    render() {
        const { loading, activities } = this.props;
        const { moreTestimonies, loadedTestimonies } = this.state;
        if (this.state.loadingInitial) return <LoadingComponent inverted={true} />;
        return (
            
            <Grid>
                <Grid.Column width={10}>
                   <div ref={this.handleContextRef}>
                    <TestimonyList 
                            testimonies={loadedTestimonies}
                            loading={loading}
                            moreTestimonies={moreTestimonies}
                            getNextTestimony={this.getNextTestimony}
                        />
                   </div>
                </Grid.Column>
                <Grid.Column width={6}>
                    <TestimonyActivity activities={activities}  contextRef={this.state.contextRef} />
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
    firestoreConnect(query)(TestimonyDashboard)
);