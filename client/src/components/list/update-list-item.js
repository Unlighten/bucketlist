import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { fetchPost, updatePost } from '../../actions/index';
import { Link } from 'react-router';
import axios from 'axios';

const ROOT_URL = 'http://localhost:4000';
const config = {
	headers: { authorization: localStorage.getItem('token') }
}

class UpdateList extends Component {
	componentWillMount() {
		this.props.fetchPost(this.props.params.id);
	}
	componentDidMount() {
		this.props.fetchPost(this.props.params.id);
	}
	handleFormSubmit(formProps) {
		this.props.updatePost(formProps, this.props.params.id);
	}
	render() {
		const { fields: {title, topic, url, content}, handleSubmit } = this.props;
		return (
			<form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
				<h3>Update Post</h3>

				<fieldset className="form-group">
					<label>Title</label>
					<input type="text" className="form-control" {...title} />
				</fieldset>
				<fieldset className="form-group">
					<label>Category</label>
					<input type="text" className="form-control" {...topic} />
				</fieldset>
				<fieldset className="form-group">
					<label>URL</label>
					<input type="text" className="form-control" {...url} />
				</fieldset>
				<fieldset className="form-group">
					<label>Content</label>
					<textarea type="text" rows="8" className="form-control text" {...content} />
				</fieldset>

				<button type="submit" className="btn btn-primary">Submit</button>
				<Link to="/items" className="btn btn-danger">Cancel</Link>
			</form>
		);
	}
}

UpdateList.propTypes = {
	fields: PropTypes.object.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	fetchPost: PropTypes.func.isRequired
}

function mapStateToProps(state) {
	return { initialValues: state.posts.post };
}

const fields = ['title', 'topic', 'url', 'content']

export default reduxForm({
	form: 'UpdateNewForm',
	fields: fields
},

mapStateToProps,

{fetchPost, updatePost})(UpdateList);