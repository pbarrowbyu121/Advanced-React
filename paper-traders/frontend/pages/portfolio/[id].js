import Portfolio from '../../components/Portfolio';

export default function PortfolioPage({query}) {
    return <Portfolio id={query.id} />
}