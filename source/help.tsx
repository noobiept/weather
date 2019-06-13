import * as React from "react";

interface HelpProps {}

interface HelpState {}

export default class Help extends React.Component<HelpProps, HelpState> {
    render() {
        return (
            <div>
                Start by searching for a city with the input entry above, to get
                some weather information.
            </div>
        );
    }
}
