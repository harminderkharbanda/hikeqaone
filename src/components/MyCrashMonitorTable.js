import React from 'react';
import Table from './DefaultTable'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import Tooltip from 'rc-tooltip';

var formData = {
    issueId: {
        "label": "Issue Id",
        "type": "MyInput",
        "value": "",
        "placeholder":"No Space Allowed",
        "mandatory": true,
        "multiSelect": false,
        "readOnly" : true
    },
    projectKey: {
        "label": "Project Key",
        "type": "MyInput",
        "placeholder":"Project Key",
        "value": "",
        "mandatory": true,
        "multiSelect": false
    },
    summary: {
        "label": "Summary",
        "type": "MyTextArea",
        "value": "",
        "mandatory": true,
        "multiSelect": false,
        "placeholder": "Add summary"
    },
    priority: {
        "label": "Priority",
        "type": "MyReactSelect",
        "value": "",
        "options": ['1 - Blocker', '2 - Critical', '3 - Major', '4 - Normal', '5 - Minor'],
        "mandatory": true,
        "multi": false,
        "selectType": "Creatable",
        "placeholder": "Priority"
    },
    assignee: {
        "label": "Assignee",
        "type": "MyInput",
        "placeholder":"Assignee",
        "value": "",
        "mandatory": true
    },
    platform: {
        "label": "Platform",
        "type": "MyReactSelect",
        "value": "",
        "options": ['Android', 'iOS', 'Android-Web', 'iOS-Web'],
        "mandatory": true,
        "multi": false,
        "selectType": "Creatable",
        "placeholder": "Platform"
    },
    fixVersion: {
        "label": "Fix Version",
        "type": "MyInput",
        "value": "",
        "mandatory": true,
        "multi": false,
        "selectType": "Creatable",
        "placeholder": "Fix Version"
    },
    description: {
        "label": "Description",
        "type": "MyTextArea",
        "value": "",
        "mandatory": true,
        "multiSelect": false,
        "placeholder": "Description"
    },
    marketBehaviour: {
        "label": "Market Behaviour",
        "type": "MyReactSelect",
        "value": "",
        "options": ['New', 'Already in Market'],
        "mandatory": true,
        "multi": false,
        "selectType": "Creatable",
        "placeholder": "Market Behaviour"
    },
    reproRate: {
        "label": "Repro Rate",
        "type": "MyReactSelect",
        "value": "",
        "options": ['100%', 'Happening Frequently (3/5)', 'Happening Rarely (<3/5)', 'Observed Once'],
        "mandatory": true,
        "multi": false,
        "selectType": "Creatable",
        "placeholder": "Repro Rate"
    },
    label: {
        "label": "Label (Option)",
        "type": "MyInput",
        "value": "",
        "mandatory": false,
        "multi": false,
        "selectType": "Creatable",
        "placeholder": "Label"
    },
    cancel: {
        "label": "Cancel" ,
        "type": "MyButton",
        "theme": "red",
        "className": "cceButton pull-left",
        "disabled": false
    },
    submit: {
        "label": "Create Jira" ,
        "type": "MyButton",
        "theme": "green",
        "className": "cceButton pull-left",
        "buttonType": "submit",
        "disabled": false
    }
}

const assignee_mapper = {'BCN': 'radhakrishna', 'CD': 'sk', 'CH': 'radhakrishna', 'SCS': 'radhakrishna',
    'APPX': 'arpit', 'CAM': 'sourav', 'STO': 'vaibhavt', 'PP': 'arpit', 'ON': 'arpit', 'US': 'arpit',
    'HP': 'abhinav', 'HL': 'lakshay', 'BR': 'prateekd', 'FRIENDS': 'vaibhavt', 'COM': 'arpit', 'NOTIF': 'arpit'}

const area_mapper = {'Chat': 'BCN', 'DevX': 'CD', 'Client Horizontal': 'CH', 'Stickers': 'SCS', 'AppX': 'APPX',
    'Native Libraries': 'CH', 'Camera': 'CAM', 'Stories and Timeline': 'STO', 'Profile and Privacy': 'PP',
    'Onboarding': 'ON', 'Universal Search & Discovery': 'US', 'Backup Restore': 'BR', 'College/Community': 'COM',
    'Friends': 'FRIENDS', 'Notification': 'NOTIF', '': 'MIS', 'Explore': 'CD', 'Jokes': 'CD','News': 'CD', 'hikemetab': 'CD', 'Wallet': 'HP', 'Hike Run (Beta)': 'HL', 'Bae Buddy Bro': 'HL',
    'Hike Rewards': 'HL', 'Confessions': 'HL', 'HikeReactStickerShop': 'SCS', 'Gift Packets': 'HP',
    'Recharge': 'HP', 'Blue Packets': 'HP', 'Polls': 'BCN', 'Vote': 'BCN', 'Bill Split': 'BCN',
    'Checklist': 'BCN'}



class MyCrashMonitorTable extends React.Component {

    constructor() {
        super()
        this.onSearch = this.onSearch.bind(this)
        this.onChangeItemsPerPage = this.onChangeItemsPerPage.bind(this)
        this.state = {
            search: '',
            itemsPerPage: 10
        }

        this.columns = [
            'title',
            'subtitle',
            'area',
            'issueType',
            'impactLevel',
            'occurances',
            'usersAffected',
            'infocusRatio',
            'jiraId',
            'status',
            'fixVersion',
            'assignee',
            'stackTrace',
            'firstBuild',
            'lastBuild'
        ]

        this.columnNames = [
            'Title',
            'Sub Title',
            'Area',
            'Issue Type',
            'Impact Level',
            'Occurances',
            'Users Affected',
            'Infocus Ratio',
            'Jira Id',
            'Status',
            'Fix Version',
            'Assignee',
            'Stack Trace',
            'First Build',
            'Last Build'
        ]
    }

    onSearch(e) {
        e.preventDefault()
        this.setState({
            search: e.target.value
        })
        return false
    }

    onChangeItemsPerPage(e) {
        e.preventDefault()
        this.setState({
            itemsPerPage: e.target.value
        })
        return false
    }

    customTitle(cell, row, rowIndex, colIndex) {
        return `${row.name} for ${cell}`;
    }

    colFormatter = (cell, row) => {
        let url = "https://hikeapp.atlassian.net/browse/" + `${row.jiraId}`
        return (
            <a style={{ color: '#0f8fd8' }} target="_blank" href={url}>{cell}</a>
        )
    }

    addBadge = (cell, row) => {
        if (`${cell}` === 'FATAL') {
            return (
                <span className="badge badge-danger badge-sm">{cell}</span>
            )
        } else {
            return (
                <span className="badge badge-info badge-sm">{cell}</span>
            )
        }
    }
    
    render() {
        return (
        <BootstrapTable data={ this.props.data } striped hover condensed search>
            <TableHeaderColumn headerAlign='center' width='250' columnTitle={ this.customTitle } dataField='title' isKey>{this.columnNames[0]}</TableHeaderColumn>
            <TableHeaderColumn headerAlign='center' width='350' columnTitle={ true } dataField='subtitle'>{this.columnNames[1]}</TableHeaderColumn>
            <TableHeaderColumn headerAlign='center' width='200' columnTitle={ true } dataField='area'>{this.columnNames[2]}</TableHeaderColumn>
            <TableHeaderColumn headerAlign='center' dataAlign='center' width='100' dataField='issueType' dataFormat={ this.addBadge }>{this.columnNames[3]}</TableHeaderColumn>
            <TableHeaderColumn headerAlign='center' dataAlign='center' width='150' dataField='impactLevel' dataSort={ true }>{this.columnNames[4]}</TableHeaderColumn>
            <TableHeaderColumn headerAlign='center' dataAlign='center' width='150' dataField='occurances' dataSort={ true }>{this.columnNames[5]}</TableHeaderColumn>
            <TableHeaderColumn headerAlign='center' dataAlign='center' width='150' dataField='usersAffected' dataSort={ true }>{this.columnNames[6]}</TableHeaderColumn>
            <TableHeaderColumn headerAlign='center' dataAlign='center' width='150' dataField='infocusRatio' dataSort={ true }>{this.columnNames[7]}</TableHeaderColumn>
            <TableHeaderColumn headerAlign='center' dataAlign='center' width='100' dataField='jiraId' dataFormat={ this.colFormatter }>{this.columnNames[8]}</TableHeaderColumn>
            <TableHeaderColumn headerAlign='center' dataAlign='center' width='100' dataField='status'>{this.columnNames[9]}</TableHeaderColumn>
            <TableHeaderColumn headerAlign='center' dataAlign='center' width='200' columnTitle={ true } dataField='fixVersion'>{this.columnNames[10]}</TableHeaderColumn>
            <TableHeaderColumn headerAlign='center' dataAlign='center' width='150' dataField='assignee'>{this.columnNames[11]}</TableHeaderColumn>
            <TableHeaderColumn headerAlign='center' width='350' columnTitle={ this.customTitle } dataField='stackTrace'>{this.columnNames[12]}</TableHeaderColumn>
            <TableHeaderColumn headerAlign='center' dataAlign='center' width='250' columnTitle={ true } dataField='firstBuild'>{this.columnNames[13]}</TableHeaderColumn>
            <TableHeaderColumn headerAlign='center' dataAlign='center' width='250' columnTitle={ true } dataField='lastBuild'>{this.columnNames[14]}</TableHeaderColumn>
        </BootstrapTable>
        )
    }
}
export default MyCrashMonitorTable
