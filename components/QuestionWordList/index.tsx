import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { IProblemProps } from '../../models/ProblemModel';
import {
    makeSelectActiveProblem,
    makeSelectLoadingStatus,
} from '../../selectors';
import { splitWordsList } from '../../utils/ProblemFireStore';
import PropagateLoader from 'react-spinners/PropagateLoader';
import { css } from '@emotion/core';
const override = css`
  display: block;
  margin: 0 auto;
  border-color: 36d7b7;
`;
const QuestionWordList = (props: {
    problem: IProblemProps;
    loadingStatus: boolean;
}) => {
    const [wordsList, setWordsList] = useState([]);
    useEffect(() => {
        if (props.problem) {
            const splitedProblems = splitWordsList(props.problem.words);
            setWordsList(splitedProblems);
        } else {
            setWordsList([]);
        }
    }, [props.problem]);
    return (
        <div className="QuestionWordList">
            {props.loadingStatus ? (
                <PropagateLoader
                    color='#4A4A4A'
                    loading={true}
                    css={override}
                />
            ) : (
                    wordsList.length !== 0 &&
                    wordsList.map((words, parentIndex) => {
                        return (
                            <div key={`${parentIndex}`} style = {{backgroundColor:'transparent'}}>
                                {words.map((item: any, index: number) => {
                                    return (
                                        <label key={`${parentIndex}-${index}`}>...&nbsp;{item}</label>
                                    );
                                })}
                            </div>
                        );
                    })
                )}
        </div>
    );
};

const mapStateToProps = createStructuredSelector({
    problem: makeSelectActiveProblem(),
    loadingStatus: makeSelectLoadingStatus(),
});

const withConnect = connect(mapStateToProps, null);
export default compose(withConnect)(QuestionWordList);
