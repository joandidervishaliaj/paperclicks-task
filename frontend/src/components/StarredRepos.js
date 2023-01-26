import { Button, Table } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { getStarredReposGithub } from '../services/GithubService';

export default function StarredRepos({ fetchData }) {
    const ACCESS_TOKEN = "accessToken";
    const USER_DATA = "userData";

    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    const userDataGithub = JSON.parse(localStorage.getItem(USER_DATA));

    const [starredRepos, setStarredRepos] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        if (fetchData) {
            getStarredReposGithub(accessToken, userDataGithub.login, page).then((response) => {
                setStarredRepos(response);
            });
        }
    }, [fetchData, accessToken, userDataGithub.login, page]);

    if (!fetchData) {
        return null;
    }

    const getStarredRepos = () => {
        return starredRepos.map((repo, key) => {
            return <Table.Row key={key}>
                <Table.Cell css={{ color: "#F4F6F7" }}>
                    {repo.name}
                </Table.Cell>
                <Table.Cell
                    css={{
                        color: repo.visibility === "public" ? "#148F77" : "#C70039",
                        fontWeight: "600"
                    }}>
                    {repo.visibility.toUpperCase()}
                </Table.Cell>
                <Table.Cell>
                    <Button color="gradient" auto ghost onPress={() => {
                        window.open(repo.html_url, '_blank', 'noreferrer');
                    }}>
                        Visit
                    </Button>
                </Table.Cell>
            </Table.Row>
        })
    }

    return (
        <Table
            bordered
            shadow={false}
            color="secondary"
            aria-label="Starred Repos table"
            css={{
                height: "auto",
                width: "100%"
            }}
        >
            <Table.Header>
                <Table.Column>NAME</Table.Column>
                <Table.Column>VISIBILITY</Table.Column>
                <Table.Column>VISIT</Table.Column>
            </Table.Header>
            <Table.Body>
                {getStarredRepos()}
            </Table.Body>
            <Table.Pagination
                shadow
                noMargin
                align="center"
                rowsPerPage={starredRepos.length >= 10 ? 10 : starredRepos.length}
                onPageChange={(page) => setPage(page)}
            />
        </Table>
    );
}
